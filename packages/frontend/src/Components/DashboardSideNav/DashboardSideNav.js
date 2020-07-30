import React from "react";
import { NavLink } from "react-router-dom";
import LogoHead from "../../Components/LogoHead/LogoHead";
import { ReactComponent as DisbursalIcon } from "../../assets/icons/icons8_crowdfunding.svg";
import { ReactComponent as SchemesIcon } from "../../assets/icons/icons8_heat_map.svg";
import { ReactComponent as ConversationsIcon } from "../../assets/icons/icons8_messaging.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/icons8_settings.svg";
import { ReactComponent as HelpIcon } from "../../assets/icons/icons8_help.svg";
import classNames from 'classnames';
import styles from './DashboardSideNav.module.css'

const DashboardSideNav = () => {
	return (
		<div className={styles.sideNav}>
			<div className={styles.logoBlock}>
				<LogoHead />
			</div>
			<div className={styles.routesBlock}>
				<NavLink 
					activeClassName={styles.activeNavRoute}
					className={styles.navRoute}
					to="/dashboard/disbursal"
				>
					<DisbursalIcon className={styles.navIcons} /> Disbursal Status
				</NavLink>
				<NavLink 
					activeClassName={styles.activeNavRoute}
					className={styles.navRoute}
					to="/dashboard/schemes"
				>
					<SchemesIcon className={styles.navIcons} /> Schemes
				</NavLink>
				<NavLink 
					activeClassName={styles.activeNavRoute}
					className={styles.navRoute}
					to="/dashboard/conversations"
				>
					<ConversationsIcon className={styles.navIcons} /> Conversations
				</NavLink>

				<div className={styles.separator} />
				
				<NavLink 
					activeClassName={styles.activeNavRoute}
					className={styles.navRoute}
					to="/dashboard/account"
				>
					<SettingsIcon className={classNames(styles.navIcons, styles.separatedIcons)} /> Account Settings
				</NavLink>
			</div>

			<div className={styles.navFooter}>
				<NavLink 
					activeClassName={classNames(styles.activeNavRoute, styles.footerActiveLink)}
					className={classNames(styles.navRoute, styles.footerLink)}
					to="/dashboard/faq"
				>
					<HelpIcon className={classNames(styles.navIcons, styles.separatedIcons)} /> FAQ
				</NavLink>				
			</div>
		</div>
	);
};

export default DashboardSideNav;
