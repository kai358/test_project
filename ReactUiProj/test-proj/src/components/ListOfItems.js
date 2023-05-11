import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function ListOfItems({ entity }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://localhost:7016/api/${entity}/`)
      setData(data)
    }
    getData()
  }, [entity])
  return (
    <div>
      {data.map((el, index) => {
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <p>{el.name}</p>
            <NavLink
              to={`/${entity}/${el.name}/${el.id}`}
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                marginLeft: '10px',
              }}>
              <button>Show history</button>
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}
