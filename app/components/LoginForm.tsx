import {doLogin} from "@/app/actions"

const LoginForm = () => {
    return (
        <form action={doLogin}>
            <button className="text-[#E3D1C3] font-bold text-sm sm:text-base lg:text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="submit" name="action" value="google">
                Sign In
            </button>
        </form>
    )
}

export default LoginForm