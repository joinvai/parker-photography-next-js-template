'use client'; // Needed for useState and Framer Motion

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming utils exists for cn function
import Image from 'next/image';

interface HeaderProps {
	defaultLogo?: 'black' | 'white';
}

function Header({ defaultLogo = 'black' }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Variants for the hamburger lines animation - 300ms duration as per brief
	const topVariants = {
		closed: { rotate: 0, translateY: 0, backgroundColor: '#000' },
		open: { rotate: 45, translateY: 6, backgroundColor: '#fff' },
	};

	const middleVariants = {
		closed: { opacity: 1, backgroundColor: '#000' },
		open: { opacity: 0, backgroundColor: '#fff' },
	};

	const bottomVariants = {
		closed: { rotate: 0, translateY: 0, backgroundColor: '#000' },
		open: { rotate: -45, translateY: -6, backgroundColor: '#fff' },
	};

	// Overlay variants - 400ms duration as per brief
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: 'easeInOut',
			},
		},
	};

	// Menu container variants with staggered children - total sequence under 1000ms as per brief
	const menuContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1, // 100ms delay between items
				delayChildren: 0.1, // Start after 100ms
			},
		},
	};

	// Individual menu item variants with subtle upward motion
	const menuItemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
	};

	const navLinks = [
		{ id: '1', name: 'Home', href: '/' },
		{ id: '2', name: 'Studio', href: '/studio' },
		{ id: '3', name: 'Projects', href: '/projects' },
		{ id: '4', name: 'Contact', href: '/contact' },
	];

	return (
		<>
			<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8">
				{/* Hamburger Button - 44x44px touch target as per brief */}
				<motion.button
					onClick={toggleMenu}
					className="relative z-50 w-11 h-11 flex flex-col justify-center items-center"
					aria-label={isOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isOpen}
					animate={isOpen ? 'open' : 'closed'}
					initial={false}
				>
					<div className="w-8 h-6 flex flex-col justify-between items-center">
						{/* Top line */}
						<motion.div
							className="w-full h-0.5"
							variants={topVariants}
							transition={{ duration: 0.3 }}
						/>
						{/* Middle line */}
						<motion.div
							className="w-full h-0.5"
							variants={middleVariants}
							transition={{ duration: 0.3 }}
						/>
						{/* Bottom line */}
						<motion.div
							className="w-full h-0.5"
							variants={bottomVariants}
							transition={{ duration: 0.3 }}
						/>
					</div>
				</motion.button>

				{/* Centered Logo - 32px vertical padding as per brief */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-8">
					<Image
						src={`/logos/${isOpen ? 'white' : defaultLogo}@2x.png`}
						alt="Logo"
						width={120}
						height={40}
						priority
					/>
				</div>
			</header>

			{/* Full-screen Navigation Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 bg-black flex items-center justify-center"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						role="dialog"
						aria-modal="true"
						aria-label="Navigation Menu"
					>
						<motion.nav
							className="flex flex-col items-center text-white"
							variants={menuContainerVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
						>
							{/* Navigation Links with Numbers */}
							<div className="space-y-6">
								{navLinks.map((link) => (
									<motion.div
										key={link.id}
										className="flex flex-col items-center text-center"
										variants={menuItemVariants}
									>
										{/* Number indicator - 12-14px as per brief */}
										<span className="text-sm opacity-70 mb-2">{link.id}</span>
										{/* Link text - 18-24px as per brief */}
										<a
											href={link.href}
											className="text-xl md:text-2xl hover:opacity-80 transition-opacity"
											onClick={() => setIsOpen(false)}
										>
											{link.name}
										</a>
									</motion.div>
								))}
							</div>
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default Header;
