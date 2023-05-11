using System;
using System.Data;
using ApiForTestProject.Models;
using Npgsql;
namespace ApiForTestProject.Data
{
	public class DbAccess
	{
        public IEnumerable<CateringPoint> GetAllCateringPoints()
        {
            var cateringPoints = new List<CateringPoint>();
            using (var cn = GetConnection())
            {
                cn.Open();
                NpgsqlCommand cmd = new NpgsqlCommand($"select * from cateringpoints", cn);

                cmd.CommandType = CommandType.Text;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    cateringPoints.Add(new CateringPoint
                    {
                        Id = int.Parse(reader["cateringpoint_id"].ToString()),
                        Name = reader["cateringpoint_name"].ToString()

                    });
                }
            }
            return cateringPoints;
        }
        public IEnumerable<CateringPointInfo> GetCateringPointInfo(int id)
        {
            var CateringPointInfoList = new List<CateringPointInfo>();
            using (var cn = GetConnection())
            {
                cn.Open();
                NpgsqlCommand cmd = new NpgsqlCommand($"select * from get_info_about_cateringpoint({id})", cn);

                cmd.CommandType = CommandType.Text;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    CateringPointInfoList.Add(new CateringPointInfo
                    {
                        Date = DateTime.Parse(reader["dt"]?.ToString()).ToShortDateString(),
                        Event = reader["client_event"]?.ToString(),
                        Client = reader["client"]?.ToString()
                    });
                }

            }
            return CateringPointInfoList;
        }
        public IEnumerable<ClientInfo> GetClientInfo(int id)
		{
			var ClientInfoList = new List<ClientInfo>();
			using (var cn = GetConnection())
			{
				cn.Open();
				NpgsqlCommand cmd = new NpgsqlCommand($"select * from get_info_about_client({id})", cn);
				
				cmd.CommandType = CommandType.Text;
				var reader = cmd.ExecuteReader();
				while (reader.Read())
				{
					ClientInfoList.Add(new ClientInfo
					{
						Date = DateTime.Parse(reader["dt"]?.ToString()).ToShortDateString(),
						Event = reader["client_event"]?.ToString(),
						CatheringPoint = reader["catering_point"]?.ToString()
					});
                }

			}
			return ClientInfoList;
		}
		public IEnumerable<Client> GetAllClients()
		{
			var clients = new List<Client>();
            using (var cn = GetConnection())
            {
                cn.Open();
                NpgsqlCommand cmd = new NpgsqlCommand($"select * from clients", cn);

                cmd.CommandType = CommandType.Text;
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    clients.Add(new Client
					{
						Id = int.Parse(reader["client_id"].ToString()),
						Name = reader["client_name"].ToString()

					});
                }
            }
			return clients;
        }
		private NpgsqlConnection GetConnection()
		{
			return new NpgsqlConnection("Server=localhost;Port=5432;Database=Artem;User Id=Artem;password=35895");
		}
	}
}

