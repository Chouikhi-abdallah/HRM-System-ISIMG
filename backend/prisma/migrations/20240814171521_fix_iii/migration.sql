-- AlterTable
CREATE SEQUENCE employee_id_seq;
ALTER TABLE "Employee" ALTER COLUMN "id" SET DEFAULT nextval('employee_id_seq');
ALTER SEQUENCE employee_id_seq OWNED BY "Employee"."id";

-- AlterTable
CREATE SEQUENCE manager_id_seq;
ALTER TABLE "Manager" ALTER COLUMN "id" SET DEFAULT nextval('manager_id_seq');
ALTER SEQUENCE manager_id_seq OWNED BY "Manager"."id";
