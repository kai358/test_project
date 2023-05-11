import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function Client() {
  const { name, id } = useParams()
  const [dataAboutAllClients, setData] = useState([])
  const [dataAboutCurrentClient, setCurrentData] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Все организации')
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://localhost:7016/api/Clients/${id}`
      )
      setData(data)
      setCurrentData(data)
    }
    getData()
  }, [id])
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
  }
  const handleRead = () => {
    const currentData =
      selectedValue === 'Все организации'
        ? dataAboutAllClients
        : dataAboutAllClients.filter((el) => {
            return el.catheringPoint === selectedValue
          })
    setCurrentData(currentData)
    setIsShow(true)
  }
  const handleReset = () => {
    setCurrentData(dataAboutAllClients)
    setIsShow(false)
  }
  return (
    <div>
      <h2 style={{ marginLeft: '20px' }}>История {name}</h2>
      <div style={{ display: 'flex', marginLeft: '20px' }}>
        <div>Организация:</div>
        <select
          onChange={handleSelectChange}
          style={{ marginLeft: '10px' }}
          value={selectedValue}>
          <option value="Все организации">Все организации</option>
          {dataAboutAllClients.map((el, index) => {
            return (
              <option key={index} value={el.catheringPoint}>
                {el.catheringPoint}
              </option>
            )
          })}
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <button onClick={handleRead} style={{ marginLeft: '20px' }}>
          Посчитать
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
          Сбросить
        </button>
      </div>
      {isShow && (
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Название поставщика</th>
              <th>Событие</th>
            </tr>
          </thead>
          <tbody>
            {dataAboutCurrentClient.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el.date}</td>
                  <td>{el.catheringPoint}</td>
                  <td>{el.event}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
