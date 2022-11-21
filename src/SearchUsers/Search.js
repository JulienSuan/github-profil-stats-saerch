import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./Search.css"

export default function Search() {

const[query, setQuery] = useState("")
  const[users, setUsers] = useState([])
  const[page, setPage] = useState(1)
  const[perPage, setPerPage] = useState(50)
  const[limit, setLimit] = useState()
  const {log} = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    try {  
      axios.get("https://api.github.com/search/users?q="+query).then(res =>
      console.log(res))
    } catch (error) {
      console.log(error);
    }
  },[])
  
  

 

  const fetchUsers = async () => {
    try {
      const {data} = await axios.get("https://api.github.com/search/users?q="+query,{
        params:{
          page: page,
          per_page: perPage,
        }
      });
      return data?.items;
    } catch (error) {
      console.log(error);
      return null
    }
  }

  const handleSarchUser = async(e) => {
    e.preventDefault()
    if (query) { 
      const items = await fetchUsers(); 
      console.log(items)
      setUsers(items)
      searchRate()
    }
  }
  useEffect(() => {
    const changeUser = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
        searchRate()
      }
    };
    changeUser()
  }, [page, perPage])
  
  
    const searchRate = async() =>  {try {  
      await axios.get("https://api.github.com/rate_limit").then(res =>
     {
      console.log(res.data)
      setLimit(res.data.resources.search.remaining)
     })
    } catch (error) {
      console.log(error);
    }}
  return (
    <div className="back">
        <div className="header">
        <form className='form' onSubmit={handleSarchUser }>
          <div className="sarch">
            <input type="text" className='input' value={query} placeholder="Search Users" onChange={(e) => setQuery(e.target.value)}/>
            <div className="img"></div>
          </div>
        </form>
      </div>
      <div className="wrap-users">
        {users ? users.map(data => {
          return (
            <div className="cont-user" onClick={() => navigate("/users/"+data.login)}>
              <img className='avatar' src={data.avatar_url}/>
              <div className="desc">
                <h1>{data.login}</h1>
              </div>
            </div>
          )
        }): <h1 style={{color: "whitesmoke"}}>Rate limit is exceeded</h1>}
      </div>
    </div>
  )
}
