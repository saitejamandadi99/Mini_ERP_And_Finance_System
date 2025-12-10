import React, {useState} from 'react'
import Loader from '../../components/Loader'
import InputField from '../../components/InputField'
import FormCard from '../../components/FormCard'

const Register = () =>{
    const [form, setForm] = useState({name:'', email:'', password:'', role_id:''})
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value })
    } 
    const handleRegister = async (e)=>{
        e.preventDefault()
        try {
            console.log("Register details", form)
            
        } catch (error) {
            setError(error.message)
            console.error(error)
        }
    }

    const renderRegisterForm = () =>{
        return(
            <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>
                <FormCard title="Register">
                    <form onSubmit={handleRegister}>
                        <InputField 
                            label="name"
                            value={form.name}
                            placeholder='Please enter your name'
                            onChange={handleChange}
                            type='text'
                            name='name'
                            required
                        />

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

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-medium mb-1'>Select Role</label>
                            <select name='role_id' value={form.role_id} onChange={handleChange} className='w-full px-2 py-4 border border-gray-300 rounded-lg' required>
                                <option value=''>Choose Role</option>
                                <option value='1'>Admin</option>
                                <option value='2'>Finance Manager</option>
                                <option value='3'>User</option>
                            </select>

                        </div>

                        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg mt-4 font-medium hover:bg-blue-700 transition-all'>Register</button>
                        <p className='text-center text-sm text-gray-600 mt-4'>Already have an account? <a href='/login' className='text-blue-600 hover:underline'>Login</a></p>
                        {error && <p className='text-center text-sm text-green-600 mt-4'>{error}</p>}
                        {success && <p className='text-center text-sm text-green-600 mt-4'>{success}</p>}
                    </form>
                </FormCard>
            </div>
        )
    }
    return(
        isLoading ? <Loader /> : renderRegisterForm()
    )
}
export default Register