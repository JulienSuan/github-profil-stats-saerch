import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import "./Users.css"


export default function Users() {
    const navigate = useNavigate()
    const {log} = useParams();
    const [user, setUser] = useState()
    const [userRepos, setUserRepos] = useState()

    useEffect(() => {
       const fetchUserData = async() => {
        const datas = await Promise.all([
            axios.get("https://api.github.com/users/"+log),
            axios.get("https://api.github.com/users/"+log+"/repos"),
        ])
        setUser(datas[0])
        setUserRepos(datas[1])
       }
       fetchUserData()
    }, [])

    const displayAll = (id) => {
        const desc = document.getElementById(id)
        desc.style.display = "block"
        desc.style.visibility = "visible"
    }
    const noneAll = (id) => {
        const desc = document.getElementById(id)
        desc.style.visibility = "hidden"
    }
    
    const [searchRepo, setsearchRepo] = useState("")

    const userData = () => {
        if (user) {
            return (
                <Fragment>
                    <div className="cont_user">
                        <div className="header-user">
                            <div className="profil">
                                <a href={user.data.html_url}><div className="image-user" style={{backgroundImage: `url(${user.data.avatar_url})`}}></div></a>
                            </div>
                        </div>
                        <div className="info">
                            <div className="Profil">
                                <div className="left">
                                    <h1 className='username'>Profil 👤</h1>
                                    <h2>Username: {user.data.login}</h2>
                                    <h3>iD: {user.data.id}</h3>
                                    <div className="propro">
                                    <a href={user.data.html_url}><h3 className='prooo'>Profil GitHub ↪ <img src={user.data.avatar_url} style={{borderRadius: "10px"}} width={50}/></h3></a>
                                    </div>
                                    <p className='bio'>Created at: <span style={{color: "#6ee7b7"}}>{user.data.created_at}</span></p>
                                    <p className='bio'>Updated: <span className='beauty'>{user.data.updated_at}</span></p>
                                    <p className='bio'>{user.data.bio}</p>
                                    <p className='bio'><a href={user.data.blog}>{user.data.blog != null  ? user.data.blog : null }</a></p>
                                    <p className='bio'>{user.data.location != null ? "From " + user.data.location : null }</p>
                                    <p className='bio'>{user.data.twitter_username != null ? "Twitter: " + user.data.twitter_username : null }</p>
                                    <p className='bio'>{user.data.email != null ? "Email: " + user.data.email : null }</p>
                                    <p className='bio'>Total repos: {user ? user.data.public_repos : null }</p>
                                    <p className='bio'>Public gists repos: {user ? user.data.public_gists : null }</p>
                                    <p className='bio'>Folowers: {user ? user.data.followers : null }</p>
                                    <p className='bio'>following: {user ? user.data.following : null }</p>
                                </div>
                                <div className="right">
                                    <h1 className='stats'>Stats ✨</h1>              
                                        <img className='stat' align="center" src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.data.login}&layout=compact&theme=tokyonight`}/>
                                        <img className='stat' align="center" src={`https://github-readme-stats.vercel.app/api?username=${user.data.login}&show_icons=true&theme=tokyonight`}/>      
                                                                   
                                </div>
                            </div>
                                <div className='sarch-repos'><input placeholder='Search Repos' onChange={(e) => setsearchRepo(e.target.value)} className='input' type="text" /></div>
                                
                            <div className="cont-repo">
                                {userRepos && userRepos.data.filter(repo => repo.name.toLowerCase().includes(searchRepo)).map(repos => {
                                    return (
                                        
                                        <a href={repos.html_url} key={repos.id}>
                                            <div className="repo" onMouseLeave={() => noneAll(repos.id)} onMouseEnter={() => displayAll(repos.id)}>
                                            {<h1 className='repo-name'>{repos.name}</h1>}
                                            {user && <img align="center" src={`https://github-readme-stats.vercel.app/api/pin/?username=${user.data.login}&repo=${repos.name}&theme=tokyonight`}/>}
                                            <div className='description' id={repos.id} key={repos.id}>
                                                <p>{repos.description}</p>
                                                <p>private: <span style={{color: repos.private ? "#6ee7b7" : "#f0abfc"}}>{repos.private.toString()}</span></p>
                                                <p>fork: <span style={{color: repos.fork ? "#6ee7b7" : "#f0abfc"}}>{repos.fork.toString()}</span></p>
                                                <p>visibility: {repos.visibility} </p>
                                                <p>forks: {repos.forks} </p>
                                                <p>size: {repos.size} Kb</p>
                                                <p>language: {repos.language ? repos.language : "No language"}</p>
                                                <p>watchers: {repos.watchers}</p>
                                                
                                            </div>
                                            
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="back2"></div>
                </Fragment>
            )
        } else console.log("nope")
    }

  return (

    <div>
      {userData()}
    </div>

  )
}
