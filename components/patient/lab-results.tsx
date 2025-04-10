import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"

const LabResult = ({ condition }) => (
  <div
    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
    data-fhir-resource-id={condition.resource.id}
  >
    <div>
      <span className="font-medium text-gray-800">{condition.resource.code.text}</span>
    </div>
    <div className="flex items-center">
      <span
        className={`font-bold ${condition.resource.clinicalStatus.coding[0].code === "active" ? "text-red-600" : "text-green-600"}`}
      >
        {condition.resource.clinicalStatus.coding[0].code}
      </span>
      <Activity className="ml-2 h-4 w-4 text-gray-500" />
    </div>
  </div>
)

export function LabResults({ labResults }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Condições de Saúde</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          {labResults.map((result) => (
            <LabResult key={result.resource.id} condition={result} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

