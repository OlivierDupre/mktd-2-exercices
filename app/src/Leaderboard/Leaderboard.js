import React from 'react'
import {fetchLeaderboard} from '../utils/Requests/apiRequests'
import Fetcher from '../utils/Requests/Fetcher'
import BarChart from './BarChart'
import Legend from './Legend'
import './Leaderboard.css'

const Board = ({data}) => {
  if (!data || data.length === 0) {
    return <Legend>
      No one is leading yet!
    </Legend>
  }

  const totalScoreByUser = data.reduce((scoreByUser, {userName, score}) => ({
    ...scoreByUser,
    [userName]: score + (scoreByUser[userName] || 0)
  }), {})

  const totalScoreArray = Object.keys(totalScoreByUser)
    .map((key) => ({
      label: key,
      value: totalScoreByUser[key]
    }))
    .sort(({value: valueA}, {value: valueB}) => valueB - valueA)

  return <div>
    <BarChart data={totalScoreArray} />
    <Legend>Points cumulés</Legend>
  </div>
}

const Leaderboard = ({loading, data, location}) => {
  return <div className='leaderboard'>
    <h2>Leaderboard</h2>

    {location.state && location.state.result && <Legend>
      Bravo ! Vous avez eu {location.state.result.score} points
    </Legend>}

    {loading
      ? <p>Chargement en cours...</p>
      : <Board data={data} />}
  </div>
}

export default Fetcher({
  propsToRequest: (props) => fetchLeaderboard()
})(Leaderboard)
