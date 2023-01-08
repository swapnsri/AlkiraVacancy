import { Close } from '../../../assets/icons'
import './Details.scss'
import {useNavigate,useLocation} from 'react-router-dom'
import DataFetch from '../../../utils/Api'
import {useEffect, useState} from 'react'

type TeamGameDetails={
	id: number,
	date: string,
	home_team: {
	id: number,
	abbreviation: string,
	city: string,
	conference: string,
	division: string,
	full_name: string,
	name: string
	},
	home_team_score: number,
	period: number,
	postseason: boolean,
	season: number,
	status: string,
	time: string,
	visitor_team: {
	id: number,
	abbreviation: string,
	city: string,
	conference: string,
	division: string,
	full_name: string,
	name: string
	},
	visitor_team_score: number
	}

const Details=()=>{
	const navigate = useNavigate()
	const [gameDetails,setGameDetails] = useState<TeamGameDetails[]>([])
	const [totalGamePlayed,setTotalGamesPlayed] = useState(0)
	const [loader,setLoader] = useState(false)
	const location = useLocation()
	const state:any = location.state
	const apiCall =async ()=>{
		setLoader(true)
		const games  = await DataFetch.get(`games?seasons[]=2021&team_ids[]=${state.id}`)
		if(games.data){
			const filteredGame = games.data.data.filter((game:TeamGameDetails)=>
				game.home_team.id === state.id
			)
			const gamesPlayed = games.data.data.filter((game:TeamGameDetails)=>
			game.home_team.id === state.id || game.visitor_team.id === state.id
		)
		const game = []
		game.push(filteredGame[0])
		setGameDetails(game)
		setTotalGamesPlayed(gamesPlayed.length)
		setLoader(false)
		}
	}
	useEffect(()=>{
   apiCall()
	},[])
	return <div className='team-details-modal'>
	<div className="team-details-season-2021">
		<div className='header'>
			<h3>{state.name}</h3>
			<span onClick={()=>navigate(-1)}><Close width='20'/></span>
			</div>
			{loader?<span className='loader'>Loading Data...</span>:<>
			{gameDetails.length>0 && gameDetails.map((details:TeamGameDetails)=>{
				return <>
			<div className='details-align'>
				<span>Team Full Name</span>
				<span>{details.home_team.full_name}</span>
			</div>
			<div className='details-align'>
				<span>Total Games in 2021</span>
				<span>{totalGamePlayed}</span>
			</div>
			<div className='random'>Random Game Details:</div>			
			<div className='details-align-margin'>
				<span>Date</span>
				<span>{details.date.split('T')[0]}</span>
			</div>
			<div className='details-align-margin'>
			<span>Home Team</span>
			<span>{details.home_team.name}</span>
			</div>
			<div className='details-align-margin'>
			<span>Home Team Score</span>
			<span>{details.home_team_score}</span>
			</div>
			<div className='details-align-margin'>
			<span>Visitor Team</span>
			<span>{details.visitor_team.name}</span>
			</div>
			<div className='details-align-margin'>
			<span>Visitor Team Score</span>
			<span>{details.visitor_team_score}</span>
			</div>
				</>
			})}
			{gameDetails.length===0?<div className='no-game-played'>No Games Played in Season 2021</div>:null}

			</>}

	</div>
	</div>
}

export default Details