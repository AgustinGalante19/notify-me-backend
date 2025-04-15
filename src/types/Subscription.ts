export default interface Subscription {
	id: number;
	name: string;
	icon: string;
	amount: number;
	wallet_target: string;
	charge_day: string;
	currency: string;
	domain: string;
}
