import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  path: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ label, path }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    if (isClient) {
      router.push(path);
      const sidebar = document.querySelector('.sidebar');
      sidebar?.classList.remove('open');
    }
  };

  return (
    <div className="sidebar-item" onClick={handleClick} data-alt={label} >
      {label}
    </div>
  );
};

export default SidebarItem;