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

export async function addSubscription(newSubscription: Subscription) {
	const { wallet_target, amount, charge_day, icon, name } = newSubscription;

	const request =
		await sql`insert into notifyme_subscriptions (name, amount, icon, charge_day, wallet_target) values (${name}, ${amount}, ${icon}, ${charge_day}, ${wallet_target})`;
	return { status: 200, rows: request.rowCount };
}

export async function editSubscription(updatedSubscription: Subscription) {
	const { id, wallet_target, amount, charge_day, icon, name } =
		updatedSubscription;

	const request = await sql`update notifyme_subscriptions set 
		name = ${name},
		amount = ${amount},
		icon  =  ${icon},
		charge_day =${charge_day},
		wallet_target = ${wallet_target}
		where id = ${id}`;

	return { status: 200, rows: request.rowCount };
}

export async function deleteSubscription(id: number) {
	return await sql`delete from notifyme_subscriptions where id = ${id}`;
}
