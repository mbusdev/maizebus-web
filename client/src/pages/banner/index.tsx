import { useEffect } from "react";
import "./index.css";

// Lives in client/public/, so it is referenced by URL rather than imported.
const BANNER_PHOTO = "/mass-meeting.jpg";

// The wave that tops the yellow block: the left corner sits low, rises to a
// small peak, slopes down across most of the width, then kicks up at the end.
// Filled down past the viewBox so each copy covers everything below its curve.
const WAVE_PATH =
	"M0,13 C25,13 60,6 85,6 C139,6 246,21 300,21 C330,21 368,8 400,1 L400,200 L0,200 Z";

// The meeting details are the one part that must never be cut off, so land the
// page at the bottom and let the photo run off the top instead. Deliberately
// not bound to resize: mobile browsers fire it when their toolbar collapses,
// which would yank a reader who scrolled up to look at the photo back down.
function pinToBottom() {
	window.scrollTo({
		top: document.documentElement.scrollHeight,
		behavior: "instant",
	});
}

export function Banner() {
	useEffect(() => {
		const previous = document.title;
		document.title = "Join MaizeBus — Mass Meeting";
		return () => {
			document.title = previous;
		};
	}, []);

	// The photo and the webfont each change the page height after mount, so
	// re-pin once each has settled.
	useEffect(() => {
		let cancelled = false;
		const pin = () => {
			if (!cancelled) pinToBottom();
		};

		pin();
		document.fonts?.ready.then(pin);

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="banner-page">
			<div className="banner-inner">
				<img
					className="banner-photo"
					src={BANNER_PHOTO}
					alt="MaizeBus presenting to a lecture hall of students"
					onLoad={pinToBottom}
				/>

				<div className="banner-body">
					<p className="banner-join">join team</p>
					<p className="banner-logo">
						<span className="banner-logo-maize">maize</span>
						<span className="banner-logo-bus">bus</span>
					</p>
					<p className="banner-pitch">
						the <strong>only student software team</strong> building
						an app used by <strong>thousands of students</strong>
					</p>

					<p className="banner-need-title">we need:</p>
					<ul className="banner-need-list">
						<li>frontend, backend</li>
						<li>finance, marketing</li>
						<li>design, UI</li>
						<li>
							and more - <strong>no resume needed</strong>
						</li>
					</ul>
				</div>

				{/* Three stacked copies of the same curve paint, top to bottom,
				    a yellow stripe, a white gap, then the yellow block. */}
				<svg
					className="banner-wave"
					viewBox="0 0 400 48"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<path d={WAVE_PATH} fill="#f1c232" />
					<path
						d={WAVE_PATH}
						transform="translate(0,8)"
						fill="#ffffff"
					/>
					<path
						d={WAVE_PATH}
						transform="translate(0,16)"
						fill="#f1c232"
					/>
				</svg>

				<div className="banner-meeting">
					<p className="banner-meeting-label">mass meeting</p>
					<p className="banner-meeting-detail">LCSIB 1355</p>
					<p className="banner-meeting-detail">Wed, Sep 16, 8:00pm</p>
				</div>
			</div>
		</div>
	);
}

export default Banner;
