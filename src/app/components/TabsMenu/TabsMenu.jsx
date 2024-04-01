import "./styles.css";

const TabsMenu = ({ tabs, activeTab, setActiveTab }) => {
	return (
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
	);
}

export default TabsMenu;