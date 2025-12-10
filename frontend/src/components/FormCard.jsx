import { Children } from "react"

const FormCard = ({title, children}) =>{
    return(
        <div className="max-w md w-full bg-white shadow-lg rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            {children}
        </div>
    )
}

export default FormCard