UPDATE offer SET status = 'Aceptado' WHERE id in (select offer_id from `order` where offer_id = 1);

select status from `order`;
select * from order
