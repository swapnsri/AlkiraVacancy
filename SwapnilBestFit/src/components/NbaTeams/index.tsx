import './NBATEAMS.scss'
import Table from 'react-bootstrap/Table';
import {useEffect,useState,useCallback} from 'react'
import DataFetch from '../../utils/Api';
import { Search } from '../../assets/icons';
import { useNavigate,Outlet,useLocation } from 'react-router-dom';
import useDebounce from '../DebounceHook';

type Teams={
    id: number,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string
}

const NbaTeams = () =>{
  const [teams,setTeams] = useState<Teams[]>([])
  const [loader,setLoader] = useState(false)
  const [offset,setOffset] = useState(1)
  const [searchValue,setSearchValue] = useState('')
  const debouncedValue = useDebounce<string>(searchValue, 2000)
  const navigate = useNavigate()
  const callAPI = async () =>{
    setLoader(true)
    const teams = await DataFetch.get(`/teams?per_page=7&page=${offset}`)
    if(teams.data){
    setLoader(false)
    setTeams(teams.data.data)
    }
  }
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value)
    setSearchValue(e.target.value)
  }

  const searchAPI = async () =>{
    setLoader(true)
    const teams = await DataFetch.get(`/teams`)
    if(teams.data){
      const searchRes = teams.data.data
      const searchV = searchValue.toLowerCase()
      const filterArray = searchRes.filter((team:Teams)=>{
        if(team.name.toLowerCase().includes(searchV) || team.abbreviation.toLowerCase().includes(searchV) || team.city.toLowerCase().includes(searchV)){
          return team
        }
      })
      setTeams(filterArray)
      setLoader(false)
    }
  }
  useEffect(() => {
    searchValue.length>0 && searchAPI()
  }, [debouncedValue,searchValue])
  useEffect(()=>{
    searchValue.length===0 && callAPI()
  },[offset,searchValue])
     return<div className={`nba-teams`}>
      <header>NBA Teams</header>
      <div className='search-box'>
        <input type='search' placeholder={'🔍 Search with team name or city or abbreviation'}
        onChange={(e)=>handleSearch(e)}
        />
      </div>
       <Table striped borderless>
      <thead>
        <tr>
          <th><div>Team Name</div></th>
          <th><div>City</div></th>
          <th><div>Abbreviation</div></th>
          <th><div>Conference</div></th>
          <th><div>Division</div></th>
        </tr>
      </thead>
      <tbody>
        {loader?<tr><td colSpan={5}><div>Fetching results...</div></td></tr>:<>{teams.map((team:Teams)=>{
          return <tr onClick={()=>navigate('details',{state:{id:team.id,name:team.name}})} key={team.id}>
          <td><div>{team.name}</div></td>
          <td><div>{team.city}</div></td>
          <td><div>{team.abbreviation}</div></td>
          <td><div>{team.conference}</div></td>
          <td><div>{team.division}</div></td>
        </tr>
        })}</>}
        {teams.length===0 && !loader?<td colSpan={5}><div className='data-not-found'>Data Not found</div></td>:null} 
      </tbody>
    </Table>
    <div className='pagination-buttons'>
        <button title={`${offset===1?'not-allowed':'prev'}`} className={`${offset===1 || searchValue?'disable-cursor':''}`} disabled={searchValue?true:offset===1?true:false} onClick={()=>setOffset((prev)=>prev===1?prev:prev-1)}>&lt;</button>
        <button title={`${searchValue || offset===1?'not-allowed':'Go to first page'}`} className={`${searchValue || offset===1?'disable-cursor':''}`} disabled={searchValue?true:false} onClick={()=>setOffset(1)}>1</button>
        <button title={`${searchValue || offset===5?'not-allowed':'Go to last page'}`} className={`${searchValue || offset===5?'disable-cursor':''}`} disabled={searchValue?true:false} onClick={()=>setOffset(5)}>5</button>
        <button title={`${offset===5?'not-allowed':'next'}`} className={`${offset===5 || searchValue?'disable-cursor':''}`} disabled={searchValue?true:offset===5?true:false} onClick={()=>setOffset((prev)=>prev===5?prev:prev+1)}>&gt;</button>
    </div>
    <Outlet/>
     </div>
}

export default NbaTeams