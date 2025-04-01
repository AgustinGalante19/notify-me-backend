import type Subscription from "../types/Subscription";

const subscriptions: Subscription[] = [
	{
		amount: 1234.56,
		charge_date: "29-03",
		icon: "Test",
		id: 1,
		name: "Testing sub",
		wallet_target: "wallet",
	},
];

//TODO: LLamar a la base de datos y retornar si corresponde
//!Si es personal && cae domingo NO se cobra tener en cuenta.
//TODO: checkear si pasa con todas o solo con personal al ser netamente en pesos
export async function getSubscriptions() {
	return subscriptions;
}
