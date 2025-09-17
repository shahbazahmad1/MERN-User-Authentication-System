import { motion } from 'framer-motion';
import Input from '../components/Input';
import { ArrowLeft, Loader, Lock, Mail, User2 } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../Store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const EditProfile = () => {
    const { user, editProfile, isLoading } = useAuthStore();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // update local state when user changes in store
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editProfile(name, password, email);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className="p-10">
                <Link to={"/"} className='text-green-400'>
                    <ArrowLeft className="w-6 h-5 mr-1" /> </Link>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        icon={User2}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-600 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='animate-spin mx-auto' /> : "Confirm Changes"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    )
}

export default EditProfile;