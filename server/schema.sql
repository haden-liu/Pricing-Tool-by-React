drop table if exists rates;

create table rates (
    id serial primary key,
    carrier varchar(50),
    freight_rate_min float(1),
    freight_rate_unit float(1),
    fuel_rate float(1),
    loading_port varchar(50),
    discharging_port varchar(50),
    valid_date date

)