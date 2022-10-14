<?php
// (A) LOAD LIBRARY
require "2-lib-items.php";

if ($_POST["req"]) {
	switch ($_POST["req"]) {
			// (B) INVALID REQUEST
		default:
			echo "Invalid request";
			break;

			// (C) GET ALL ITEMS
		case "get":
			echo json_encode($_ITEMS->get());
			break;

			// (D) ADD ITEM
		case "add":
			$_ITEMS->add($_POST["name"], $_POST["qty"]);
			echo "OK";
			break;

			// (E) UPDATE ITEM STATUS
		case "update":
			$_ITEMS->update($_POST["got"], $_POST["id"]);
			echo "OK";
			break;

			// (F) DELETE ITEM
		case "delete":
			$_ITEMS->delete($_POST["id"]);
			echo "OK";
			break;
	}
}
