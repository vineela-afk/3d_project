import React ,{ useState,useRef, Suspense}from 'react'
import emailjs from '@emailjs/browser'
import  {Fox}  from '../models/Fox';
import Loader from '../components/Loader';
import {Canvas} from '@react-three/fiber';
import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';
function Contact() {

  const formRef= useRef();
  const [form,setForm] =useState({name:'',email:'',message:''})
  const [loading,setLoading] =useState(false);
  const [currentAnimation ,setCurrentAnimation]= useState('idle');

  const {alert, showAlert ,hideAlter} =useAlert();
  const handleChange =(e)=>{
    setForm({...form ,[e.target.name]:e.target.value})
  }
  const handleFocus =()=>{
      setCurrentAnimation('walk');
  }
  const handleBlur =()=>{ 
    setCurrentAnimation('blur')
    
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation('hit');
    console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,)
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name:form.name,
        to_name:'Adrian',
        from_email:form.email,
        to_email:"contact@gmai..come",
        message:form.message
      },
      'pQbwIjn54CfBIpHxu'
    ).then(()=>{
      setLoading(false);
      setTimeout(()=>{
        setCurrentAnimation('idle')
        setForm({name:'',email:'',message:''})
      },[3000])
      showAlert({show:true, text:'message sent succesfully', type:'sucess'})
    }).catch((error)=>{
      setLoading(false)
      setCurrentAnimation('idle');
      console.log(error)
      showAlert({show:true, text:'i didnt receive  ', type:'danger'})
    })
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container '>
      {alert.show && <Alert {...alert}/>}
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in touch </h1>
        <form onSubmit={handleSubmit} ref={formRef} className='w-full flex flex-col gap-7 mt-14'>
          <label className='text-black-500 font-semibold'>
            Name
            <input type="text" name="name" className="input" placeholder='john' required value={form.name} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}></input>
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input type="email" name="email" className="input" placeholder='john@gmail.com' required value={form.email} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}></input>
          </label>
          <label className='text-black-500 font-semibold'>
            Message
            <textarea type="message" name="message" className="input" placeholder='let me know how to help u' required value={form.message} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}></textarea>
          </label>
          <button type='submit' className='btn' onFocus={handleFocus} disabled={loading} onBlur={handleBlur}>
            {loading ? 'Sending....': 'Send Message'}
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact