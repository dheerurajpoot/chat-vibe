import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Shield, Eye, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
	title: "Safety Guidelines - ChatVibe | Important Information",
	description:
		"Read important safety guidelines and terms before using ChatVibe video chat platform.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function Disclaimer() {
	return (
		<div className='min-h-screen py-20 px-4 bg-white'>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-12'>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6'>
						<AlertTriangle className='h-10 w-10 text-amber-600' />
					</div>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						<span className='gradient-text'>Safety First</span>
					</h1>
					<p className='text-xl text-gray-700 font-medium'>
						Please read these important guidelines before starting
						your video chat
					</p>
				</div>

				<div className='glass-effect rounded-2xl p-8 neon-glow mb-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
						<div className='space-y-6'>
							<div className='flex items-start space-x-4'>
								<Shield className='h-6 w-6 text-emerald-500 mt-1 flex-shrink-0' />
								<div>
									<h3 className='text-gray-800 font-semibold mb-2'>
										Stay Safe Online
									</h3>
									<p className='text-gray-700 text-sm'>
										Never share personal information like
										your full name, address, phone number,
										or financial details.
									</p>
								</div>
							</div>

							<div className='flex items-start space-x-4'>
								<Eye className='h-6 w-6 text-blue-500 mt-1 flex-shrink-0' />
								<div>
									<h3 className='text-gray-800 font-semibold mb-2'>
										Be Respectful
									</h3>
									<p className='text-gray-700 text-sm'>
										Treat others with respect. Harassment,
										hate speech, or inappropriate behavior
										is not tolerated.
									</p>
								</div>
							</div>

							<div className='flex items-start space-x-4'>
								<Users className='h-6 w-6 text-cyan-500 mt-1 flex-shrink-0' />
								<div>
									<h3 className='text-gray-800 font-semibold mb-2'>
										Age Restriction
									</h3>
									<p className='text-gray-700 text-sm'>
										You must be 18+ to use this service.
										Minors should not access this platform.
									</p>
								</div>
							</div>
						</div>

						<div className='space-y-6'>
							<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
								<h3 className='text-red-600 font-semibold mb-2'>
									⚠️ Important Warnings
								</h3>
								<ul className='text-gray-700 text-sm space-y-1'>
									<li>
										• You may encounter inappropriate
										content
									</li>
									<li>
										• Conversations are not monitored in
										real-time
									</li>
									<li>• Report any violations immediately</li>
									<li>
										• Use the disconnect button if
										uncomfortable
									</li>
								</ul>
							</div>

							<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
								<h3 className='text-blue-600 font-semibold mb-2'>
									🛡️ Your Privacy
								</h3>
								<ul className='text-gray-700 text-sm space-y-1'>
									<li>• Chats are not recorded or stored</li>
									<li>• Your identity remains anonymous</li>
									<li>• No personal data is collected</li>
									<li>• Connections are peer-to-peer</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='border-t border-pink-200 pt-6'>
						<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
							<div className='text-center sm:text-left'>
								<p className='text-gray-800 font-semibold mb-1'>
									Ready to continue?
								</p>
								<p className='text-gray-600 text-sm'>
									By proceeding, you agree to our{" "}
									<Link
										href='/terms'
										className='text-pink-500 hover:underline'>
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										href='/privacy'
										className='text-pink-500 hover:underline'>
										Privacy Policy
									</Link>
								</p>
							</div>
							<div className='flex gap-4'>
								<Link
									href='/'
									className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
									Go Back
								</Link>
								<Link
									href='/chat'
									className='px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2'>
									I Understand, Continue
									<ArrowRight className='h-4 w-4' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
