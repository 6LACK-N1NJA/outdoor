import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const RADIAN = Math.PI / 180
const data = [
  { name: 'Low', value: 75, color: '#FFB3B3' },
  { name: 'Medium', value: 75, color: '#B3B3FF' },
  { name: 'High', value: 30, color: '	#B3FFB3' },
]
const cx = 45
const cy = 40
const iR = 27
const oR = 40

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0
  data.forEach((v) => {
    total += v.value
  })
  const ang = 180.0 * (1 - value / total)
  const length = (iR + 2 * oR) / 3
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 4
  const x0 = cx + r
  const y0 = cy + r
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return [
    <circle key={`circ_${value}`} cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key={`path_${value}`}
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ]
}

export default function NeedleChart({ value, title }) {
  return (
    <figure className='m-2'>
      {/* <PieChart id={`chart_${title}`} width={90} height={50}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
          opacity={0.8}
        >
          {data.map((entry, index) => (
            <React.Fragment key={`cell-${index}`}>
                 <Cell fill={entry.color}></Cell>
            </React.Fragment>
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#d0d000')}
      </PieChart> */}
      <h4 className='text-sm'>{title}</h4>
    </figure>
  )
}
