import React, {useState} from 'react'
import Loader from '../../components/Loader'
import InputField from '../../components/InputField'
import FormCard from '../../components/FormCard'

const Login = () =>{
    const [form, setForm] = useState({email:'', password:''})
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value })
    } 
    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
            console.log("login details", form)
            
        } catch (error) {
            setError(error.message)
            console.error(error)
        }
    }

    const renderLoginForm = () =>{
        return(
            <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>
                <FormCard title="Login">
                    <form onSubmit={handleLogin}>
                        <InputField 
                            label="email"
                            value={form.email}
                            placeholder='Please enter your email'
                            onChange={handleChange}
                            type='email'
                            name='email'
                            required
                        />

                         <InputField 
                            label="password"
                            value={form.password}
                            placeholder='Please enter your password'
                            onChange={handleChange}
                            type='password'
                            name='password'
                            required
                        />

                        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg mt-4 font-medium hover:bg-blue-700 transition-all'>Login</button>
                        <p className='text-center text-sm text-gray-600 mt-4'>Don't have an account? <a href='/register' className='text-blue-600 hover:underline'>Register</a></p>
                        {error && <p className='text-center text-sm text-green-600 mt-4'>{error}</p>}
                        {success && <p className='text-center text-sm text-green-600 mt-4'>{success}</p>}
                    </form>
                </FormCard>
            </div>
        )
    }
    return(
        isLoading ? <Loader /> : renderLoginForm()
    )
}
export default Login