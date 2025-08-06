import Input from '../input/input'
import { getUserSuggestions } from '@/app/actions/getUserSuggestions'
import { auth } from "@/auth"
import LoginForm from "@/app/components/LoginForm";

export const metadata = {
    title: 'Enter Boba',
}

export const dynamic = 'force-dynamic'

type Suggestions = {
    shops: string[]
    drinks: string[]
}

export default async function InputPage() {
    const session = await auth()

    if (!session?.user?.email) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        Please Log In
                    </h1>
                    <p className="text-lg text-gray-800 mb-4">
                        You need to be logged in to add boba entries.
                    </p>
                    <div className="flex flex-col items-center justify-center text-center w-1/2 mx-auto bg-black p-3 rounded-lg shadow-md">
                        <LoginForm />
                    </div>
                </div>
            </div>
        )
    }

    let suggestions: Suggestions = { shops: [], drinks: [] }
    let fetchError = ''

    try {
        const result = await getUserSuggestions()

        if (result && typeof result === 'object' && 'shops' in result && 'drinks' in result) {
            suggestions = {
                shops: Array.isArray(result.shops) ? result.shops : [],
                drinks: Array.isArray(result.drinks) ? result.drinks : []
            }
        } else {
            console.warn('getUserSuggestions returned unexpected format:', result)
            fetchError = 'Failed to load suggestions - invalid data format.'
        }
    } catch (error) {
        console.error('getUserSuggestions failed:', error)

        if (error instanceof Error) {
            fetchError = 'Failed to load suggestions.'

            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            })
        } else {
            fetchError = 'Failed to load suggestions due to an unknown error.'
            console.error('Non-Error object thrown:', error)
        }
    }

    return (
        <Input suggestions={suggestions} serverError={fetchError}/>
    )
}