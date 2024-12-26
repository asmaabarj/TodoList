import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TodoListApp';

  ngOnInit() {
    // Logique du sidebar
    document.addEventListener('DOMContentLoaded', () => {
      // Gestion des items du menu
      document.querySelectorAll('#sidebar ul > li > .menu-item').forEach((item) => {
        item.addEventListener('click', () => {
          document.querySelectorAll('#sidebar ul > li > .menu-item').forEach((otherItem) => {
            otherItem.classList.remove('bg-[#d9f3ea]', 'text-green-700');
            otherItem.classList.add('text-gray-800');
          });
          item.classList.add('bg-[#d9f3ea]', 'text-green-700');
          item.classList.remove('text-gray-800');
        });
      });

      // Gestion du toggle sidebar
      const sidebarToggleBtn = document.getElementById('toggle-sidebar');
      const sidebarCollapseMenu = document.getElementById('sidebar-collapse-menu');

      sidebarToggleBtn?.addEventListener('click', () => {
        if (!sidebarCollapseMenu?.classList.contains('open')) {
          if (sidebarCollapseMenu && sidebarToggleBtn) {
            sidebarCollapseMenu.classList.add('open');
            sidebarCollapseMenu.style.cssText = 'width: 250px; visibility: visible; opacity: 1;';
            sidebarToggleBtn.style.cssText = 'left: 236px;';
          }
        } else {
          if (sidebarCollapseMenu && sidebarToggleBtn) {
            sidebarCollapseMenu.classList.remove('open');
            sidebarCollapseMenu.style.cssText = 'width: 32px; visibility: hidden; opacity: 0;';
            sidebarToggleBtn.style.cssText = 'left: 10px;';
          }
        }
      });
    });
  }
}
