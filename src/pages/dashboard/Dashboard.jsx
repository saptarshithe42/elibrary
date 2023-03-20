import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectFirestore } from "../../firebase/config";

// styles
import './Dashboard.css'

// components
import SearchComponent from "../../components/SearchComponent";
import BooksGrid from "../../components/BooksGrid";


export default function Dashboard() {

	return (
		<div className="dashboard">
		
			<SearchComponent />

			<BooksGrid />
			
		</div>
	)
}
