import "./styles.css";

/**
 * Renders a tabs menu component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the component.
 * @param {Array} props.tabs - The array of tab names.
 * @param {Array} props.tabsContents - The array of tab contents.
 * @param {string} props.activeTab - The currently active tab.
 * @param {function} props.setActiveTab - The function to set the active tab.
 * @returns {JSX.Element} The rendered TabsMenu component.
 */
const TabsMenu = ({
    className,
    tabs,
    tabsContents,
    activeTab,
    setActiveTab,
}) => {
    // Get the index of the active tab
    const activeTabIndex = tabs.indexOf(activeTab);

    // Display the tabs and their contents
    // The active tab is displayed with the 'active' class
    // The contents of the active tab are displayed
    return (
        <div className={className}>
            <span className="tabs-menu">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={`tab-item ${
                            tab === activeTab ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </span>
            {tabsContents[activeTabIndex]}
        </div>
    );
};

export default TabsMenu;
