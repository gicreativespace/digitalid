/* --- Top Settings Menu --- */
.top-settings-wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
}

.settings-icon {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.settings-icon:hover {
    background-color: rgba(200, 169, 106, 0.2);
}

.settings-dropdown {
    position: absolute;
    top: 45px;
    right: 0;
    background-color: var(--white);
    border: 1px solid var(--champagne);
    border-radius: 12px;
    box-shadow: var(--shadow-hover);
    width: 200px;
    overflow: hidden;
    animation: fadeInDown 0.2s ease-out;
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 12px 16px;
    text-align: left;
    background: none;
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: var(--forest-green);
    cursor: pointer;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: var(--ivory);
}

.close-item {
    color: var(--warm-grey);
    border-top: 1px solid rgba(200, 169, 106, 0.2);
}
