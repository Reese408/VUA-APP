import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function LoginPlaceholder() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#fafafa' }}>
            <div className="max-w-md w-full">
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style={{ backgroundColor: 'var(--golden-yellow)' }}
                    >
                        <MessageSquare className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                    </div>

                    <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Login Page
                    </h1>

                    <p className="text-lg mb-8" style={{ color: 'var(--dark-gray)' }}>
                        This page is under construction. The authentication system will be implemented soon.
                    </p>

                    <div
                        className="p-6 rounded-xl mb-8"
                        style={{ backgroundColor: 'rgba(30, 58, 138, 0.05)' }}
                    >
                        <p className="text-sm text-left" style={{ color: 'var(--dark-gray)' }}>
                            <strong style={{ color: 'var(--dark-blue)' }}>Coming Soon:</strong>
                        </p>
                        <ul className="text-sm text-left mt-3 space-y-2" style={{ color: 'var(--dark-gray)' }}>
                            <li>• Email and password login</li>
                            <li>• Account activation for new users</li>
                            <li>• Password reset functionality</li>
                            <li>• Role-based redirects</li>
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                        style={{
                            backgroundColor: 'var(--dark-blue)',
                            color: 'white'
                        }}
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
