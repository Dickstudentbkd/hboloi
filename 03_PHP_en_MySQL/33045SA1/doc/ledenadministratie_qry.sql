SELECT * FROM roles;
SELECT * FROM users;
SELECT * FROM role_families;
SELECT * FROM type_of_members;
SELECT * FROM fiscal_years;
SELECT * FROM families;
SELECT * FROM family_members;
SELECT * FROM family_members
WHERE rolefamilie_id Not in(1, 2) ;

SELECT * FROM contributions
order by updated_at desc;
SELECT * FROM bookings
order by updated_at desc;

SELECT * FROM type_of_members
WHERE age_from <= 10 and age_to >= 10;
SELECT * FROM bookings;
SELECT * FROM contributions;
SELECT amount, credit, kindofbooking, bookings.description, age, type_of_members.description, discount, age_from, age_to FROM bookings 
INNER JOIN contributions ON bookings.contribution_id=contributions.id
INNER JOIN type_of_members ON contributions.typeofmember_id=type_of_members.id;

SELECT family_name,  city,  year, C.amount, C.age FROM families as F
INNER JOIN family_members as FM ON F.id=FM.family_id
INNER JOIN contributions as C ON FM.id=C.family_member_id
INNER JOIN fiscal_years as FY ON C.fiscal_year_id=FY.id
WHERE FY.activ=1;

-- contributions
SELECT C.id, amount, C.age, FM.first_name, FM. sur_name FROM contributions C
INNER JOIN family_members FM ON C.family_member_id=FM.id;