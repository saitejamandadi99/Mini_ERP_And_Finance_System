const KpiCard = ({title, value})=>{
    return(
        <div className="p-4 bg-white border rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">{title}</p>
            <h2 className="text-2xl font-bold mt-1">{value ?? "--"}</h2>
        </div>
    )
}

export default KpiCard