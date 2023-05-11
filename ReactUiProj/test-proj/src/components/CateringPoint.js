import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function Client() {
  const { name, id } = useParams()
  const [dataAboutAllCateringPoints, setData] = useState([])
  const [dataAboutCurrentCateringPoint, setCurrentData] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Все клиенты')
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://localhost:7016/api/Cateringpoints/${id}`
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
      selectedValue === 'Все клиенты'
        ? dataAboutAllCateringPoints
        : dataAboutAllCateringPoints.filter((el) => {
            return el.client === selectedValue
          })
    setCurrentData(currentData)
    setIsShow(true)
  }
  const handleReset = () => {
    setCurrentData(dataAboutAllCateringPoints)
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
          <option value="Все клиенты">Все клиенты</option>
          {dataAboutAllCateringPoints.map((el, index) => {
            return (
              <option key={index} value={el.client}>
                {el.client}
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
              <th>Название клиента</th>
              <th>Событие</th>
            </tr>
          </thead>
          <tbody>
            {dataAboutCurrentCateringPoint.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el.date}</td>
                  <td>{el.client}</td>
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
