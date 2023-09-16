import Link from "next/link";

type Props = {
  name: string;
};

export function ItemMenu({ name }: Props) {
  return (
    <Link className="flex items-center gap-3" href={"/" + name.toLowerCase()}>
      <span className="font-bold text-primary-gray text-2xl">{name}</span>
    </Link>
  );
}
