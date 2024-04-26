import "./styles.css";

const TabsMenu = ({ tabs, tabsContents, activeTab, setActiveTab }) => {
	// Get the index of the active tab
	const activeTabIndex = tabs.indexOf(activeTab);

	// Display the tabs and their contents
	// The active tab is displayed with the 'active' class
	// The contents of the active tab are displayed
	return (
		<>
		<span className="tabs-menu">
			{tabs.map((tab) => (
				<div
					key={tab}
					className={`tab-item ${tab === activeTab ? 'active' : ''}`}
					onClick={() => setActiveTab(tab)}
				>
					{tab}
				</div>
			))}
		</span>
		{tabsContents[activeTabIndex]}
		</>
	);
}

export default TabsMenu;