import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    const { name, subject, title, topic, duration } = companion;

    if (!user) redirect('/sign-in');
    if (!name) redirect('/companions')
    return (
        <main className="space-y-6">
            <article className="flex justify-between items-center flex-wrap gap-4 bg-white shadow-sm border border-gray-200 rounded-xl p-6 transition hover:shadow-md">
                {/* Icon + Name/Topic */}
                <div className="flex items-center gap-4 flex-1 min-w-[250px]">
                    {/* Subject Icon */}
                    <div
                        className="w-[72px] h-[72px] hidden md:flex items-center justify-center rounded-lg"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>

                    {/* Title and Topic */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                            <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 border border-gray-200 max-sm:hidden">
                                {subject}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">{topic}</p>
                    </div>
                </div>

                {/* Duration */}
                <div className="text-gray-700 text-lg font-medium hidden md:block">
                    ⏱️ {duration} min
                </div>
            </article>

            {/* Chat or interaction component */}
            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>

    )
}

export default CompanionSession;