import React from 'react';
import { useNavigate  } from 'react-router-dom';
import '../../styles/header-style.css';
import image from '../../images/etc-latam-logo.png';


const Header = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('csrfToken');
		localStorage.removeItem("userId");

		navigate('/login');
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header-content">
					<div className="logo">
						<img src={image} width={150}/>
						{/*<h1>ETC-LATAM</h1>*/}
					</div>
					<nav className="nav">
						<ul>
							<li>
								<button className="logout-button" onClick={handleLogout}>
									Cerrar sesión
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
