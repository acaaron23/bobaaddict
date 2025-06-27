import {doLogin} from "@/app/actions"

const LoginForm = () => {
    return (
        <form action={doLogin}>
            <button className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                type="submit" name="action" value="google">
                Sign In
            </button>
        </form>
    )
}

export default LoginForm