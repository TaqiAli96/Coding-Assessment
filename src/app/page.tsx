import LayoutWrapper from './LayoutWrapper';
import Products from './products/page';

export default function Home() {
  return (
    <main>
      <LayoutWrapper>
        <Products />
      </LayoutWrapper>
    </main>
  )
}