import { type QueryResult, sql } from "@vercel/postgres";
import type Subscription from "../types/Subscription";

//!Si es personal && cae domingo NO se cobra tener en cuenta.
//TODO: checkear si pasa con todas o solo con personal al ser netamente en pesos

interface GetSubscriptionsParams {
	day?: string;
}

export async function getSubscriptions({
	day,
}: GetSubscriptionsParams): Promise<Subscription[]> {
	let queryResult: QueryResult<Subscription>;

	if (day) {
		queryResult =
			await sql`select * from notifyme_subscriptions where charge_day = ${day};`;
	} else {
		queryResult = await sql`select * from notifyme_subscriptions;`;
	}

	const result: Subscription[] = queryResult.rows.map(
		({ amount, charge_day, icon, id, name, wallet_target }) => ({
			amount,
			charge_day,
			icon,
			id,
			name,
			wallet_target,
		}),
	);

	return result;
}
