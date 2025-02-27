import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const {store, dispatch} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container-fluid d-flex justify-content-between">
				
				<span className="navbar-brand ms-3 h1"><strong>{store.slug? store.slug+ "'s " : null}Contact List</strong></span>
				
				<div className="ml-auto me-3">
					<Link to="/" className="btn btn-outline-secondary me-2">
						Homepage
					</Link>
					<Link to="/new-contact" className="btn btn-outline-secondary">
						Add contact
					</Link>
				</div>
			</div>
		</nav>
	);
};