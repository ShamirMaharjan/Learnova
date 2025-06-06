import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {
    getUserCompanions,
    getUserSessions,
    getBookmarkedCompanions,
} from "@/lib/actions/companion.actions"
import Image from "next/image"
import CompanionsList from "@/components/CompanionsList"

const Profile = async () => {
    const user = await currentUser()
    if (!user) redirect("/sign-in")

    const companions = await getUserCompanions(user.id)
    const sessionHistory = await getUserSessions(user.id)
    const bookmarkedCompanions = await getBookmarkedCompanions(user.id)

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
            {/* Profile Header */}
            <section className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-5">
                    <Image
                        src={user.imageUrl}
                        alt={`${user.firstName}'s profile picture`}
                        width={100}
                        height={100}
                        className="rounded-full object-cover border border-gray-300"
                    />
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-gray-500">{user.emailAddresses[0].emailAddress}</p>
                    </div>
                </div>

                {/* User Stats */}
                <div className="flex gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-center border border-gray-200">
                        <div className="flex items-center justify-center gap-2 text-primary font-semibold text-lg">
                            <Image src="/icons/check.svg" alt="checkmark" width={20} height={20} />
                            <span>{sessionHistory.length}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Lessons Completed</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-center border border-gray-200">
                        <div className="flex items-center justify-center gap-2 text-primary font-semibold text-lg">
                            <Image src="/icons/cap.svg" alt="cap" width={20} height={20} />
                            <span>{companions.length}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Companions Created</p>
                    </div>
                </div>
            </section>

            {/* Accordion Sections */}
            <section className="space-y-4">
                <Accordion type="multiple" className="space-y-2">
                    {/* Bookmarked Companions */}
                    <AccordionItem value="bookmarks">
                        <AccordionTrigger className="text-xl font-semibold text-gray-800">
                            Bookmarked Companions ({bookmarkedCompanions.length})
                        </AccordionTrigger>
                        <AccordionContent className="bg-gray-50 p-4 rounded-md border">
                            <CompanionsList
                                companions={bookmarkedCompanions}
                                title="Bookmarked Companions"
                            />
                        </AccordionContent>
                    </AccordionItem>

                    {/* Recent Sessions */}
                    <AccordionItem value="recent">
                        <AccordionTrigger className="text-xl font-semibold text-gray-800">
                            Recent Sessions
                        </AccordionTrigger>
                        <AccordionContent className="bg-gray-50 p-4 rounded-md border">
                            <CompanionsList
                                companions={sessionHistory}
                                title="Recent Sessions"
                            />
                        </AccordionContent>
                    </AccordionItem>

                    {/* My Companions */}
                    <AccordionItem value="companions">
                        <AccordionTrigger className="text-xl font-semibold text-gray-800">
                            My Companions ({companions.length})
                        </AccordionTrigger>
                        <AccordionContent className="bg-gray-50 p-4 rounded-md border">
                            <CompanionsList
                                companions={companions}
                                title="My Companions"
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
    )
}

export default Profile
