import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const MyUi = () => {
  const [passwordArray, setpasswordArray] = useState([])
  const [form, setform] = useState({ site: '', username: '', password: '' })

  const getPassword = async () => {
    try {
      const req = await fetch('http://localhost:3000/')

      // Check if the response is okay (status code 200-299)
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`)
      }

      // Attempt to parse the response as JSON
      const password = await req.json()

      console.log(password)
      setpasswordArray(password)
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching the password:', error)

      // You can also handle non-JSON responses here if necessary
      // For example:
      // const text = await req.text();
      // console.log('Response text:', text);
    }
  }

  useEffect(() => {
    getPassword()
  }, [])

  const ref = useRef()
  const passwordRef = useRef()
  const showPass = () => {
    if (ref.current.src.includes('icons/hide.png')) {
      ref.current.src = 'icons/eye.png'
      passwordRef.current.type = 'password'
    } else {
      ref.current.src = 'icons/hide.png'
      passwordRef.current.type = 'text'
    }
  }

  const copyText = (text) => {
    toast('Copy to Clipboard', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
    navigator.clipboard.writeText(text)
  }

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: form.id }),
      })

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      })
      // localStorage.setItem('password', JSON.stringify(newPasswordArray))
      setform({ site: '', username: '', password: '' })

      toast('Password Saved', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast('Error: Password not saved!', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  const deletePassword = async (id) => {
    const confirmed = confirm('Do you want to delete this password?')
    if (confirmed) {
      const updatedPasswordArray = passwordArray.filter(
        (item) => item.id !== id
      )
      setpasswordArray(updatedPasswordArray)
      let res = await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      // localStorage.setItem('password', JSON.stringify(updatedPasswordArray))

      toast('Password Deleted', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  const editPassword = (id) => {
    console.log('edit Password with id', id)

    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id })
    setpasswordArray(passwordArray.filter((item) => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="p-3 md:mycontainer min-h-[84vh]">
        <h1 className="text-4xl text-white font-bold text-center">
          <span className="text-white">&lt;</span>
          Pass
          <span className="text-green-700">Up/&gt;</span>
        </h1>
        <p className="text-green-800 text-lg text-center font-bold">
          Your Own Password Manager
        </p>
        <div className="flex flex-col text-black p-4 gap-8 items-center">
          <input
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website Url"
            type="text"
            id="site"
            className="rounded-full border-2 border-green-800 w-full p-4 py-1"
          />

          <div className="flex flex-col md:flex-row gap-8 justify-center w-full">
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Your Username"
              type="text"
              id="username"
              className="rounded-full border-2 border-green-800 w-full p-4 py-1"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                type="password"
                id="password"
                className="rounded-full border-2 border-green-800 w-full p-4 py-1"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPass}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="rounded-full border-2 border-green-800 bg-white text-black flex justify-center items-center w-fit mx-auto p-2 gap-2 px-3 py-1 hover:bg-green-100"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <span> Save Password</span>
          </button>
        </div>
        <div className="password">
          <h2 className="text-white font-bold font-mono text-2xl py-3">
            Your Passwords
          </h2>
          {passwordArray.length === 0 ? (
            <div className="text-white font-semibold font-mono">
              No passwords to show
            </div>
          ) : (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-">Site</th>
                  <th className="py-">Username</th>
                  <th className="py-">Password</th>
                  <th className="py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-300">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center py-2 border border-black font-semibold">
                      <div className="flex justify-center items-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: '25px',
                              height: '25px',
                              padding: '2px',
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-black font-semibold">
                      <div className="flex justify-center items-center">
                        {item.username}
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: '25px',
                              height: '25px',
                              padding: '2px',
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-black font-semibold">
                      <div className="flex justify-center items-center">
                        {'*'.repeat(item.password.length)}
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: '25px',
                              height: '25px',
                              padding: '2px',
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center text-center  py-2 border border-black font-semibold">
                      <span
                        onClick={() => editPassword(item.id)}
                        className="rounded-md p-1 px-2 text-center font-mono text-white cursor-pointer"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                          stroke="bold"
                          style={{ width: '25px', height: '25px' }}
                        ></lord-icon>
                      </span>
                      <span
                        onClick={() => deletePassword(item.id)}
                        className="rounded-md p-1 px-2 text-center font-mono text-white cursor-pointer"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/drxwpfop.json"
                          trigger="hover"
                          stroke="bold"
                          style={{ width: '25px', height: '25px' }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default MyUi
