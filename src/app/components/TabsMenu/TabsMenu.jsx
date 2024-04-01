import "./styles.css";

const TabsMenu = ({ tabs, tabsContents, activeTab, setActiveTab }) => {
	const activeTabIndex = tabs.indexOf(activeTab);
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