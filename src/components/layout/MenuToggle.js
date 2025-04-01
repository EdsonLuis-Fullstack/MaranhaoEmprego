const MenuToggle = ({ isOpen }) => {
    return (
        <div className="menu-toggle">
            {isOpen ? (
                <svg width="30" height="30" viewBox="0 0 24 24">
                    <path d="M6 6L18 18M6 18L18 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> 
            ) : (
                <svg width="30" height="30" viewBox="0 0 24 24">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )}
        </div>
    );
};

export default MenuToggle;
