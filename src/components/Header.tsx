import Image from "next/image";
import Logo from "@/img/logo.png";

import { ItemMenu } from "./ItemMenu";
import { Container } from "./Container";
import { Modal } from "./Modal";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center w-full h-20 bg-primary-red">
      <div className="max-w-[1246px] px-[15px] mx-auto">
        <Container>
          <div className="flex items-center gap-14">
            <ul className="flex items-center gap-12">
              <li>
                <ItemMenu name="Listagem" />
              </li>
              <li>
                <ItemMenu name="Graficos" />
              </li>
              <li>
                <Link href={"/"}>
                  <Image src={Logo} alt="Logo" width={150} />
                </Link>
              </li>
              <li>
                <ItemMenu name="Vender" />
              </li>
              <li>
                <ItemMenu name="Propostas" />
              </li>
            </ul>
          </div>
        </Container>
        {/* <Modal isVisible/> */}
      </div>
    </header>
  );
}
