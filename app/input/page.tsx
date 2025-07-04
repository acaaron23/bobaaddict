import Input from '../input/input'
import { getUserSuggestions } from '@/app/actions/getUserSuggestions'

export const metadata = {
    title: "Enter Boba",
};

export default async function InputPage() {
    const suggestions = await getUserSuggestions()
    return <Input suggestions={suggestions} />
};