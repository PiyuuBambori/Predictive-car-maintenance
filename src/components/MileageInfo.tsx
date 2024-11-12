interface MileageInfoProps {
  data: {
    mileage: number;
    nextService: Date;
  };
}

export default function MileageInfo({ data }: MileageInfoProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Mileage Information</h2>
      <div className="space-y-4">
        <div>
          <div className="text-gray-600">Current Mileage</div>
          <div className="text-3xl font-bold text-blue-600">{data.mileage.toLocaleString()} miles</div>
        </div>
        <div>
          <div className="text-gray-600">Next Service Due</div>
          <div className="text-lg text-blue-600">{data.nextService.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}