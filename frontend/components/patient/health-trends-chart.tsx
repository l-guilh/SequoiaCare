"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const colors = {
  primary: "#2ecc71",
  secondary: "#a24f1b",
  darkBlue: "rgb(27, 55, 100)",
}

const healthData = [
  { date: "2023-01", glucose: 95, cholesterol: 180, weight: 70 },
  { date: "2023-02", glucose: 100, cholesterol: 175, weight: 71 },
  { date: "2023-03", glucose: 92, cholesterol: 178, weight: 69 },
  { date: "2023-04", glucose: 98, cholesterol: 172, weight: 70 },
  { date: "2023-05", glucose: 105, cholesterol: 185, weight: 72 },
  { date: "2023-06", glucose: 95, cholesterol: 180, weight: 71 },
]

export function HealthTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendências de Saúde</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="glucose" stroke={colors.primary} name="Glicose (mg/dL)" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="cholesterol"
              stroke={colors.secondary}
              name="Colesterol (mg/dL)"
            />
            <Line yAxisId="right" type="monotone" dataKey="weight" stroke={colors.darkBlue} name="Peso (kg)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

